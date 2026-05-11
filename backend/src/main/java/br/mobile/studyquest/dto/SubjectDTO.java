package br.mobile.studyquest.dto;

import br.mobile.studyquest.model.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SubjectDTO(
        @NotBlank String name,
        String colorHex,
        @NotNull Priority priority
        ) {
}
