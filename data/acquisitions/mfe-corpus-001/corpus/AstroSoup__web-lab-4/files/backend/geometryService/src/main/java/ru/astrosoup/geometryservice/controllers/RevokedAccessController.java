package ru.astrosoup.geometryservice.controllers;

import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import ru.astrosoup.geometryservice.services.RevocationService;

@Path("/revoke")
public class RevokedAccessController {

    @Inject
    private RevocationService revocationService;

    @POST
    public void revoke(String token) {
        revocationService.revoke(token);
        System.out.println("Revoked token: " + token);
    }

}
