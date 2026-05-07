package br.mobile.studyquest.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record QuestDTO(
        @NotBlank String title,
        String description,
        @NotNull @Min(1) Integer xpReward,
        Long subjectId
) {
}
