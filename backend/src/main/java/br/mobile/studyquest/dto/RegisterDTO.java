package br.mobile.studyquest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record  RegisterDTO(
        @NotBlank(message = "O email não pode ser vazio.")
        @Email(message = "Formato de email inválido.")
        String email,

        @NotBlank(message = "O nome não pode ser vazio.")
        String firstName,

        @NotBlank(message = "O sobrenome não pode ser vazio.")
        String lastName,

        @NotBlank(message = "O username não pode ser vazio.")
        String username,

        @NotBlank(message = "A senha não pode ser vazia.")
        String password,

        @NotNull(message = "A idade é obrigatória.")
        @Min(value = 0, message = "A idade não pode ser menor que zero.")
        Integer age

) {

}



