package Api.InstantPlay.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores", indexes = {
        @Index(name = "idx_user_game", columnList = "user_id, game_id"),
        @Index(name = "idx_score_value", columnList = "score_value DESC")
})
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType. LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "score_value", nullable = false)
    private Integer scoreValue;

    @CreationTimestamp
    @Column(name = "played_at", updatable = false)
    private LocalDateTime playedAt;
}