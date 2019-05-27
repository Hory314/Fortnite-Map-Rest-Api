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

    @Column(columnDefinition = "BIT(1) DEFAULT FALSE", nullable = false)
    private Boolean accepted;

    @OneToOne
    private Item link;

    private Integer number;

    @Column(columnDefinition = "DOUBLE(6,2) DEFAULT NULL", name = "circle_radius")
    private Double circleRadius;

    @OneToOne
    @JoinColumn(name = "description_id", unique = true)
    private Description description;

    @Column(name = "image_url")
    private String imageUrl;
}
