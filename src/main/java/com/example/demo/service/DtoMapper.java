package com.example.demo.service;

public interface DtoMapper<M, Q, S> {
    S mapToDto(M m);

    M mapToModel(Q q);
}
