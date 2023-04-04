package com.example.demo.service.mapper;

public interface ResponseDtoMapper<M, S> {
    S mapToDto(M m);
}
