package pl.hordyjewiczmichal.fortnitebrmap.model;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "items")
@Data
public class Item
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "DECIMAL(10, 6) NOT NULL")
    private BigDecimal lat;

    @Column(columnDefinition = "DECIMAL(10, 6) NOT NULL")
    private BigDecimal lng;

    private String type;
}
