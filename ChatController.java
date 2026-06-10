package com.tanishka.portfolio.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")   // tighten to your frontend URL in production
public class ChatController {

    @Value("${anthropic.api.key}")
    private String apiKey;

    private static final String ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
    private static final String MODEL          = "claude-sonnet-4-20250514";

    private static final String SYSTEM_PROMPT = """
        You are TJ-AI, the personal portfolio assistant for Tanishka Jaiswal —
        a Full Stack Developer based in Indore, India. You speak on her behalf
        to help recruiters, collaborators, and visitors.

        PERSONALITY: Professional, confident, friendly. Concise answers.

        KEY FACTS:
        - MCA student, Medi-Caps University, CGPA 8.4
        - Skills: Java 11+/17, Spring Boot, React.js, Microservices, JWT/OAuth2,
          MySQL, MongoDB, Docker, JUnit, Mockito
        - Intern @ Zoomcode Technology (Jan–Apr 2025): full-stack microservices
        - Intern @ 51 Digital Media (Aug–Dec 2024): React.js, PWA, 95+ Lighthouse
        - Projects: ThinkerTheorist Blog Platform, Portfolio PWA, Hello NFC Platform
        - Certifications: Spring Boot (Scaler), Java & DSA (Infosys), Code Master
        - Available for full-time opportunities
        - Email: tanishkaj290@gmail.com | GitHub: coderTanishkaJaiswal02

        Keep answers under 150 words unless asked for more detail.
        Never invent skills or experience not listed above.
        """;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody Map<String, Object> body) {

        @SuppressWarnings("unchecked")
        List<Map<String, String>> messages =
                (List<Map<String, String>>) body.get("messages");

        // Build Anthropic request payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("model",      MODEL);
        payload.put("max_tokens", 512);
        payload.put("system",     SYSTEM_PROMPT);
        payload.put("messages",   messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key",           apiKey);
        headers.set("anthropic-version",   "2023-06-01");

        RestTemplate rest = new RestTemplate();
        HttpEntity<Map<String, Object>> req = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response =
                    rest.postForEntity(ANTHROPIC_URL, req, Map.class);

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> content =
                    (List<Map<String, Object>>) response.getBody().get("content");
            String reply = (String) content.get(0).get("text");

            return ResponseEntity.ok(Map.of("reply", reply));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("reply", "Sorry, I couldn't process that. Please try again."));
        }
    }
}
