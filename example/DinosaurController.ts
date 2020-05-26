// Copyright 2020 Liam Tan. All rights reserved. MIT license.

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Header,
  Context,
  Request,
  Response,
  HttpStatus,
  BadRequestException,
  RouterContext,
  OakRequest,
  OakResponse,
  Doc,
} from "./deps.ts";

@Controller("/dinosaur")
class DinosaurController {
  @Get("/")
  @HttpStatus(200)
  @Doc({
    description: "Gets all dinosaurs, and allows sorting and ordering",
  })
  getDinosaurs(@Query("orderBy") orderBy: string, @Query("sort") sort: string) {
    const dinosaurs: any[] = [
      { name: "Tyrannosaurus Rex", period: "Maastrichtian" },
      { name: "Velociraptor", period: "Cretaceous" },
      { name: "Diplodocus", period: "Oxfordian" },
    ];

    if (orderBy) {
      dinosaurs.sort((a: any, b: any) => (a[orderBy] < b[orderBy] ? -1 : 1));
      if (sort === "desc") dinosaurs.reverse();
    }

    return {
      message: "Action returning all dinosaurs! Defaults to 200 status!",
      data: dinosaurs,
    };
  }
  @Get("/:id")
  getDinosaurById(@Param("id") id: number, @Header("content-type") contentType: string) {
    return {
      message: `Action returning one dinosaur with id ${id}`,
      ContentType: contentType,
    };
  }
  @Post("/")
  @HttpStatus(201)
  @Doc({
    description: "Create a new dinosaur",
  })
  createDinosaur(@Body("name") name: string) {
    if (!name) {
      throw new BadRequestException("name is a required field");
    }
    return {
      message: `Created dinosaur with name ${name}`,
    };
  }
  @Put("/:id")
  updateDinosaur(@Param("id") id: number, @Body("name") name: string) {
    return {
      message: `Updated name of dinosaur with id ${id} to ${name}`,
    };
  }
  @Delete("/:id")
  deleteDinosaur(
    @Context() ctx: RouterContext,
    @Request() req: OakRequest,
    @Response() res: OakResponse
  ) {
    return {
      message: `Deleted dinosaur with id ${ctx.params.id}`,
    };
  }
}

export default DinosaurController;
