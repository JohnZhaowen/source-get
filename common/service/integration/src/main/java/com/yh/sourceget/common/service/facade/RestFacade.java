
package com.yh.sourceget.common.service.facade;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/sourceget")
@Consumes("application/json;charset=UTF-8")
@Produces("application/json;charset=UTF-8")
public interface RestFacade {

    @GET
    @Path("/restService/{id}")
    String sayRest(@PathParam("id") String string);
}