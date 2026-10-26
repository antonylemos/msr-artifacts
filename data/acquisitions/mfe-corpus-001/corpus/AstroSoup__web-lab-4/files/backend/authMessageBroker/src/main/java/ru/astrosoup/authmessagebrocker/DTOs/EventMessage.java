package ru.astrosoup.authmessagebrocker.DTOs;

import jakarta.json.bind.annotation.JsonbCreator;
import lombok.Data;

@Data
public class EventMessage {

    // Other types can be added if needed, but for now one will suffice
    public enum Type {
        USER_ACCESS_REVOKED;

        @JsonbCreator
        public static Type fromString(String s) {
            return EventMessage.Type.valueOf(s.toUpperCase());
        }
    }

    Type type;
    String message;
}
