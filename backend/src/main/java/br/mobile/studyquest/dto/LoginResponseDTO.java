package br.mobile.studyquest.dto;

public record LoginResponseDTO(
        String token,
        UserResponseDTO user
) {}
