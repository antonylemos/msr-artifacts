package ru.astrosoup.geometryservice.clients;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.sse.SseEventSource;
import ru.astrosoup.geometryservice.DTOs.EventMessage;
import ru.astrosoup.geometryservice.services.RevocationService;

import java.util.Set;
import java.util.stream.Collectors;
@Singleton @Startup
public class EventSubscribeClient {

    @Inject
    RevocationService service;

    private Client client;
    private SseEventSource source;

    @PostConstruct
    public void init() {
        subscribe(Set.of(
                EventMessage.Type.USER_ACCESS_REVOKED
        ));
    }

    private void subscribe(Set<EventMessage.Type> types) {
        client = ClientBuilder.newClient();
        WebTarget webTarget = client.target("http://broker:8080/events/subscribe")
                    .queryParam("events", types.stream()
                        .map(EventMessage.Type::toString)
                        .collect(Collectors.joining(",")));
        source = SseEventSource.target(webTarget).build();

        source.register(inboundSseEvent -> {
            EventMessage.Type inboundType = EventMessage.Type.fromString(inboundSseEvent.getName());
            if (types.contains(inboundType)) {

                // Here I can handle other types of events in the future
                switch (inboundType) {
                    case USER_ACCESS_REVOKED:
                        service.revoke(inboundSseEvent.readData());
                        break;
                    default:
                        break;
                }
            }
        });
        source.open();
    }

    @PreDestroy
    public void cleanup() {
        if (source != null) source.close();
        if (client != null) client.close();
    }
}
