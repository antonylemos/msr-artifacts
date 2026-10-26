package ru.astrosoup.geometryservice;

import jakarta.inject.Inject;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import ru.astrosoup.geometryservice.clients.EventSubscribeClient;

@ApplicationPath("/geometry")
public class GeometryApplication extends Application {
    @Inject
    private EventSubscribeClient eventSubscribeClient;
}
