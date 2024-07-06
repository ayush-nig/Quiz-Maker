package com.quizmaker.quiz.service;

import com.quizmaker.quiz.model.Question;

import java.util.List;
import java.util.Optional;

public interface Iquestionservice {
    Question createquestion(Question question);

    List<Question> getallquestions();

    Optional<Question> getquestionbyid(Long id);

    List<String> getallsubjects();

    Question updatequestion(Long id, Question question);

    void deletequestion(Long id);

    List<Question> getquestionsforuser(int numberofquestions, String subject);
}
