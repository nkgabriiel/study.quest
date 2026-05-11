package br.mobile.studyquest.dto;

public record UserResponseDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String username
) {}