package br.mobile.studyquest.controller;

import br.mobile.studyquest.dto.SubjectDTO;
import br.mobile.studyquest.model.Subject;
import br.mobile.studyquest.service.SubjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping
    public ResponseEntity<Subject> create (@RequestBody @Valid SubjectDTO data, Authentication authentication) {
        String email = authentication.getName();
        Subject newSubject = subjectService.createSubject(data, email);
        return ResponseEntity.status(201).body(newSubject);
    }

    @GetMapping
    public ResponseEntity<List<Subject>> listAll(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(subjectService.listMySubjects(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        try {
            subjectService.deleteSubject(id, email);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
