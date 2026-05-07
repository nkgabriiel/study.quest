package br.mobile.studyquest.service;

import br.mobile.studyquest.dto.QuestDTO;
import br.mobile.studyquest.model.Quest;
import br.mobile.studyquest.model.Subject;
import br.mobile.studyquest.model.User;
import br.mobile.studyquest.repository.QuestRepository;
import br.mobile.studyquest.repository.SubjectRepository;
import br.mobile.studyquest.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestService {

    @Autowired
    private QuestRepository questRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public Quest createQuest(QuestDTO data, String userEmail) {
        User user = (User) userRepository.findByEmail(userEmail);

        Quest quest = new Quest();
        quest.setTitle(data.title());
        quest.setDescription(data.description());
        quest.setXpReward(data.xpReward());
        quest.setUser(user);

        if(data.subjectId() != null) {
            Subject subject = subjectRepository.findById(data.subjectId())
                    .orElseThrow(() -> new IllegalArgumentException("Matéria não encontrada."));

            if(!subject.getUser().getEmail().equals(userEmail)) {
                throw new IllegalArgumentException("Você não tem permissão para usar essa matéria.");
            }
            quest.setSubject(subject);
        }
        return questRepository.save(quest);
    }

    public List<Quest> listMyQuests (String userEmail) {
        return questRepository.findAllByUserEmail(userEmail);
    }

    @Transactional
    public void completeQuest(Long questId, String userEmail) {
        Quest quest = questRepository.findById(questId)
                .orElseThrow(() -> new IllegalArgumentException("MIssão não encontrada"));

        if(!quest.getUser().getEmail().equals(userEmail)) {
            throw  new IllegalArgumentException("Acesso negado.");
        }

        if(quest.getIsCompleted()) {
            throw new IllegalArgumentException("Missão já foi concluída anteriormente.");
        }

        quest.setIsCompleted(true);
        questRepository.save(quest);

        User user = quest.getUser();
        user.setXp(user.getXp() + quest.getXpReward());

        userRepository.save(user);
    }
}
