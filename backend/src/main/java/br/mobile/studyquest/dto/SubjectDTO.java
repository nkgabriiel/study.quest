package br.mobile.studyquest.dto;

import br.mobile.studyquest.model.Priority;
import jakarta.validation.constraints.NotBlank;

public record SubjectDTO(
        @NotBlank String name,
        String colorHex,
        @NotBlank Priority priority
        ) {
}
