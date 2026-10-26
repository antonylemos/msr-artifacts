package ru.astrosoup.authmessagebrocker.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.sse.SseEventSink;
import ru.astrosoup.authmessagebrocker.DTOs.EventMessage;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
@ApplicationScoped
public class ConnectionManagementService {

    private Map<EventMessage.Type, Set<SseEventSink>> subscriptions = new ConcurrentHashMap<>();

    /**
     * method to subscribe to specific events
     * @param sseEventSink sink object that will manage event sending
     * @param eventTypes types of the events service will receive
     */
    public void subscribe(SseEventSink sseEventSink, Set<EventMessage.Type> eventTypes) {
        for (EventMessage.Type eventType : eventTypes) {
            Set<SseEventSink> subscribers = getSubscribers(eventType);
            subscribers.add(sseEventSink);
        }
    }

    /**
     * method for unsubscribing service from all events it is currently subscribed to.
     * @param sseEventSink sink to be removed from all its subscriptions
     */
    public void unsubscribe(SseEventSink sseEventSink) {
        for (Set<SseEventSink> subscribers : subscriptions.values()) {
            subscribers.remove(sseEventSink);
        };
    }

    /**
     * Getter for subscribers of specific event.
     * @param eventType type of event to find subscribers of
     * @return all the sinks subscribed to specified event type.
     */
    public Set<SseEventSink> getSubscribers(EventMessage.Type eventType) {
        return subscriptions.computeIfAbsent(eventType, t ->
                Collections.newSetFromMap(new ConcurrentHashMap<>()));
    }
}
