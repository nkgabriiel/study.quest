package br.mobile.studyquest.service;

import br.mobile.studyquest.dto.SubjectDTO;
import br.mobile.studyquest.model.Subject;
import br.mobile.studyquest.model.User;
import br.mobile.studyquest.repository.SubjectRepository;
import br.mobile.studyquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    public Subject createSubject(SubjectDTO data, String userEmail) {
        User user = (User) userRepository.findByEmail(userEmail);

        Subject subject = new Subject();
        subject.setName(data.name());
        subject.setPriority(data.priority());
        subject.setColorHex(data.colorHex());
        subject.setUser(user);

        return subjectRepository.save(subject);
    }

    public List<Subject> listMySubjects (String userEmail) {
        return subjectRepository.findAllByUserEmail(userEmail);
    }

}
