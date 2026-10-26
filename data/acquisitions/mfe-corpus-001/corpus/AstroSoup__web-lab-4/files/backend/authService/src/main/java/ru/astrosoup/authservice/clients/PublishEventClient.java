package ru.astrosoup.authservice.clients;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.astrosoup.authservice.DTOs.EventMessage;

import java.net.URI;

@ApplicationScoped
public class PublishEventClient {

    public void publish(EventMessage message) {
        try(Client client = ClientBuilder.newClient()) {
            WebTarget target = client.target(URI.create("http://broker:8080/events/publish"));
            Response response = target.request().post(Entity.entity(message, MediaType.APPLICATION_JSON));
        }
    }
}
