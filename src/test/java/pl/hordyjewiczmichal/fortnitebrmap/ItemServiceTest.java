package pl.hordyjewiczmichal.fortnitebrmap;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;
import pl.hordyjewiczmichal.fortnitebrmap.repository.ItemRepository;
import pl.hordyjewiczmichal.fortnitebrmap.service.ItemService;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemServiceTest
{
    @TestConfiguration
    static class ItemServiceTestContextConfiguration
    {
        @Bean
        public ItemService itemServ()
        {
            return new ItemService();
        }
    }

    @Autowired
    ItemService itemServ;

    @MockBean
    ItemRepository itemRepository;

    // given
    private double lat = 123.000;
    private double lng = -456.000;

    @Before
    public void setUp()
    {
        List<Item> items = new ArrayList<>();

        Item item = new Item();
        item.setId(1L);
        item.setLat(BigDecimal.valueOf(lat));
        item.setLng(BigDecimal.valueOf(lng));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setNumber(100);

        items.add(item);

        Mockito.when(itemRepository.findItemsByTypeAndAccepted(Type.FORTBYTE, true))
               .thenReturn(items);
    }

    @Test
    public void whenSearchForAllFortbytes_thenListOfItemsShouldBeReturned() throws JsonParseException, IOException
    {
        // when
        ObjectNode geoJson = itemServ.getAcceptedItems(Type.FORTBYTE);

        // then
        JsonNode coordinates = geoJson.get("features").get(0).get("geometry").get("coordinates");

        assertThat(coordinates.get(0).decimalValue().doubleValue())
                .isEqualTo(lng);
        assertThat(coordinates.get(1).decimalValue().doubleValue())
                .isEqualTo(lat);
    }
}
