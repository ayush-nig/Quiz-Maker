package com.quizmaker.quiz.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.quizmaker.quiz.model.Question;
import com.quizmaker.quiz.service.Iquestionservice;
import jakarta.validation.Valid;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/quizzes")
public class questioncontroller {

        private Iquestionservice iquestionservice;

        @CrossOrigin(origins = "http://localhost:5173")
        @PostMapping("/create-new-question")
        public ResponseEntity<Question> createquestion(@Valid @RequestBody Question question) {
            Question createdquestion = iquestionservice.createquestion(question);
            return ResponseEntity.status(CREATED).body(createdquestion);
        }

        @CrossOrigin(origins = "http://localhost:5173")
        @GetMapping("/all-questions")
        public ResponseEntity<List<Question>> getallquestions(){
            List<Question> questions = iquestionservice.getallquestions();
            return ResponseEntity.ok(questions);
        }

        @CrossOrigin(origins = "http://localhost:5173")
        @GetMapping("/question/{id}")
        public ResponseEntity<Question> getquestionbyid(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
            Optional<Question> thequestion = iquestionservice.getquestionbyid(id);
            if(thequestion.isPresent())
            {
                return ResponseEntity.ok(thequestion.get());
            }
            else {
                throw new ChangeSetPersister.NotFoundException();
            }
        }

        @CrossOrigin(origins = "http://localhost:5173")
        @PutMapping("/quiz/{id}/update")
        public ResponseEntity<Question> updatequestion
                (@PathVariable Long id, @RequestBody Question question){
            Question updatedquestion = iquestionservice.updatequestion(id, question);
            return ResponseEntity.ok(updatedquestion);
        }

        @CrossOrigin(origins = "http://localhost:5173")
        @DeleteMapping("/question/{id}/delete")
        public ResponseEntity<Void> deletequestion(@PathVariable Long id){
            iquestionservice.deletequestion(id);
            return ResponseEntity.noContent().build();
        }

        @CrossOrigin(origins = "http://localhost:5173")
        @GetMapping("/subjects")
        public ResponseEntity<List<String>> getallsubjects(){
            List<String> subjects = iquestionservice.getallsubjects();
            return ResponseEntity.ok(subjects);
        }

        @CrossOrigin(origins = "http://localhost:5173")
        @GetMapping("/quiz/fetch-questions-for-user")
        public ResponseEntity<List<Question>> getquestionsforuser
                (@RequestParam int numberofquestions, @RequestParam String Subject){
            List<Question> allquestions = iquestionservice.getquestionsforuser(numberofquestions, Subject);
            List<Question> mutablequestions = new ArrayList<>(allquestions);
            Collections.shuffle(mutablequestions);

            int availablequestions = Math.min(numberofquestions, mutablequestions.size());
            List<Question> randomquestions = mutablequestions.subList(0, availablequestions);
            return ResponseEntity.ok(randomquestions);
        }
}
