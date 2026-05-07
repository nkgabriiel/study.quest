package br.mobile.studyquest.controller;

import br.mobile.studyquest.dto.QuestDTO;
import br.mobile.studyquest.model.Quest;
import br.mobile.studyquest.service.QuestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quests")
public class QuestController {

    @Autowired
    private QuestService questService;

    @PostMapping
    public ResponseEntity<Quest> create(@RequestBody @Valid QuestDTO data, Authentication authentication) {
        String email = authentication.getName();
        Quest newQuest = questService.createQuest(data, email);
        return ResponseEntity.status(201).body(newQuest);
    }

    @GetMapping
    public ResponseEntity completeQuest(@PathVariable Long id, Authentication authentication) {
        try {
            String email = authentication.getName();
            questService.completeQuest(id, email);
            return ResponseEntity.ok("Missão concluída com sucesso.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
