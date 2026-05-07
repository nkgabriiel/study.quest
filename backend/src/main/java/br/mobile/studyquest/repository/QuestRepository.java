package br.mobile.studyquest.repository;

import br.mobile.studyquest.model.Quest;
import br.mobile.studyquest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    List<Quest> findAllByUserEmail(String email);
    List<Quest> findAllBySubjectIdAndUserEmail(Long subjectId, String email);

    String user(User user);
}
