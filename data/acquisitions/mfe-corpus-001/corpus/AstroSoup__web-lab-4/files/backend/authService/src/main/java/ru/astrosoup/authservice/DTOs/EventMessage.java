package ru.astrosoup.authservice.DTOs;

import jakarta.json.bind.annotation.JsonbCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventMessage {

    // Other types can be added if needed, but for now one will suffice
    public enum Type {
        USER_ACCESS_REVOKED;

        @JsonbCreator
        public static Type fromString(String s) {
            return Type.valueOf(s.toUpperCase());
        }
    }

    Type type;
    String message;
}
