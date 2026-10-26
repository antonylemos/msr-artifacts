package ru.astrosoup.authservice.filters;

import io.prometheus.metrics.core.metrics.Counter;
import io.prometheus.metrics.core.metrics.Histogram;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;

import static java.util.Objects.isNull;


@Provider
public class PrometheusMetricsFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final Histogram LATENCY = Histogram.builder()
            .name("http_request_latency_seconds")
            .help("HTTP request latency in seconds.")
            .labelNames("method", "path", "status")
            .register();

    private static final Counter STATUS_COUNTER = Counter.builder()
            .name("http_requests_total")
            .help("Total HTTP requests.")
            .labelNames("method", "path", "status")
            .register();

    private static final Histogram RESPONSE_SIZE = Histogram.builder()
            .name("http_response_size_bytes")
            .help("HTTP response size in bytes.")
            .labelNames("method", "path", "status")
            .register();

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        long startTime = System.nanoTime();
        requestContext.setProperty("startTime", startTime);
    }

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {

        String path = requestContext.getUriInfo().getPath();
        String method = requestContext.getMethod();
        String status = String.valueOf(responseContext.getStatus());

        Long startTime = (Long) requestContext.getProperty("startTime");

        if (!isNull(startTime)) {
            long durationNs = System.nanoTime() - startTime;

            LATENCY.labelValues(method, path, status).observe(durationNs);
        }

        STATUS_COUNTER.labelValues(method, path, status).inc();

        int size = responseContext.getLength();

        if (size > 0) {
            RESPONSE_SIZE.labelValues(method, path, status).observe(size);
        }
    }
}
