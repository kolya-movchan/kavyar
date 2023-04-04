package com.example.demo.service.mapper;

public interface RequestDtoMapper<M, Q> {
    M mapToModel(Q q);
}
