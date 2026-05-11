package br.mobile.studyquest.service;

import br.mobile.studyquest.dto.SubjectDTO;
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
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestRepository questRepository;

    public Subject createSubject(SubjectDTO data, String userEmail) {
        User user = (User) userRepository.findByEmail(userEmail);

        Subject subject = new Subject();
        subject.setName(data.name());
        subject.setPriority(data.priority());
        subject.setColorHex(data.colorHex());
        subject.setUser(user);

        return subjectRepository.save(subject);
    }

    @Transactional
    public void deleteSubject(Long subjectId, String userEmail) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new IllegalArgumentException("Matéria não encontrada."));

        if(!subject.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("Acesso negado, você não pode deletar essa matéria.");
        }

        List<Quest> questsMateria = questRepository.findAllBySubjectIdAndUserEmail(subjectId, userEmail);

        if(!questsMateria.isEmpty()) {
            questRepository.deleteAll(questsMateria);
        }

        subjectRepository.delete(subject);
    }

    public List<Subject> listMySubjects (String userEmail) {
        return subjectRepository.findAllByUserEmail(userEmail);
    }

}
