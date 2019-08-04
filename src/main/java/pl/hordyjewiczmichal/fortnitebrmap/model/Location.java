package pl.hordyjewiczmichal.fortnitebrmap.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "locations")
@Data
@ToString(exclude = {"items"}) // it will avoid StackOverflow exception when calling toString()
public class Location
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String en;

    @Column(unique = true)
    private String pl;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    private List<Item> items;
}
