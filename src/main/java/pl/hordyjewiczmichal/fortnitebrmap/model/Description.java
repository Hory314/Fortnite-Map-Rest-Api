package pl.hordyjewiczmichal.fortnitebrmap.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "description")
@Data
public class Description
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT DEFAULT NULL")
    private String en;

    @Column(columnDefinition = "TEXT DEFAULT NULL")
    private String pl;
}
