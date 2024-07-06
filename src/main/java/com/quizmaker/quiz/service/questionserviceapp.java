package com.quizmaker.quiz.service;

import com.quizmaker.quiz.model.Question;
import com.quizmaker.quiz.repository.questionrepo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public class questionserviceapp implements Iquestionservice{

    private questionrepo questionrepo;
    @Override
    public Question createquestion(Question question) {
        return questionrepo.save(question);
    }

    @Override
    public List<Question> getallquestions() {
        return questionrepo.findAll();
    }

    @Override
    public Optional<Question> getquestionbyid(Long id) {
        return questionrepo.findById(id);
    }

    @Override
    public List<String> getallsubjects() {
        return questionrepo.findDistinctSubject();
    }

    @Override
    public Question updatequestion(Long id, Question question) {
        Optional<Question> theques = this.getquestionbyid(id);
        if(theques.isPresent())
        {
            Question updatedques = theques.get();
            updatedques.setQuestion(question.getQuestion());
            updatedques.setChoices(question.getChoices());
            updatedques.setCorrectanswers(question.getCorrectanswers());
            return questionrepo.save(updatedques);
        }
        return null;
    }

    @Override
    public void deletequestion(Long id) {
        questionrepo.deleteById(id);
    }

    @Override
    public List<Question> getquestionsforuser(int numberofquestions, String subject) {
        Pageable pageable = PageRequest.of(0,numberofquestions);
        return questionrepo.findBySubject(subject, pageable).getContent();
    }
}
