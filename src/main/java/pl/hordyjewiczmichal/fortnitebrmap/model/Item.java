package pl.hordyjewiczmichal.fortnitebrmap.model;

import lombok.Data;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

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

    @Column(columnDefinition = "DECIMAL(10, 6)", nullable = false)
    private BigDecimal lat;

    @Column(columnDefinition = "DECIMAL(10, 6)", nullable = false)
    private BigDecimal lng;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;


//    @Enumerated(EnumType.STRING)
//    private Location location;
}
