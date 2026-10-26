package ru.astrosoup.authmessagebrocker.controllers;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.sse.OutboundSseEvent;
import jakarta.ws.rs.sse.Sse;
import jakarta.ws.rs.sse.SseEventSink;
import ru.astrosoup.authmessagebrocker.DTOs.EventMessage;
import ru.astrosoup.authmessagebrocker.services.ConnectionManagementService;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Path("/events")
public class PubSubController {

    @Context
    private Sse sse;

    @Inject
    private ConnectionManagementService service;

    /**
     * Endpoint for publishing info to broker
     * @param message one of predefined events with additional msg payload
     * @return HTTP response
     */
    @Path("/publish") @POST
    public Response publish(EventMessage message) {

        Set<SseEventSink> subscribers = service.getSubscribers(message.getType());
        OutboundSseEvent event = sse.newEventBuilder()
                .name(message.getType().toString())
                .data(String.class, message.getMessage())
                .build();

        for (SseEventSink sink : subscribers) {
            if (sink.isClosed()) {
                service.unsubscribe(sink);
            } else {
                try {
                    sink.send(event);
                } catch (Exception e) {
                    service.unsubscribe(sink);
                }
            }
        }

        return Response.ok().build();
    }

    /**
     * Endpoint for subscribing to certain events
     * @param types types of events, the service will be notified about.
     */
    @Path("/subscribe") @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public void subscribe(@QueryParam("events") String types, @Context SseEventSink sink) {
        if (isNull(types) || types.isBlank()) {
            return;
        }

        Set<EventMessage.Type> eventTypes = Arrays.stream(types.split(","))
                .map(EventMessage.Type::fromString)
                .collect(Collectors.toSet());

        service.subscribe(sink, eventTypes);
    }
}
