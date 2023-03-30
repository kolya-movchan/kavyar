package com.example.demo.service.mapper;

public interface DtoMapper<M, Q, S> {
    S mapToDto(M m);

    M mapToModel(Q q);
}
