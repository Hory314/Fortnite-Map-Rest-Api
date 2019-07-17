package pl.hordyjewiczmichal.fortnitebrmap;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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

    @Before
    public void setUp()
    {
        List<Item> items = new ArrayList<>();
        Item item;

        // 82 (#70) fortbyte
        item = new Item();
        item.setId(82L);
        item.setLat(BigDecimal.valueOf(647.644043));
        item.setLng(BigDecimal.valueOf(197.651367));
        item.setType(Type.FORTBYTE);
        item.setNumber(70);
        item.setAccepted(true);
        items.add(item);

        // 125 -> 82
        item = new Item();
        item.setId(125L);
        item.setLat(BigDecimal.valueOf(687.941895));
        item.setLng(BigDecimal.valueOf(191.894531));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        // 126 -> 125
        item = new Item();
        item.setId(126L);
        item.setLat(BigDecimal.valueOf(653.720703));
        item.setLng(BigDecimal.valueOf(201.169434));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        // 127 -> 126
        item = new Item();
        item.setId(127L);
        item.setLat(BigDecimal.valueOf(669.392090));
        item.setLng(BigDecimal.valueOf(197.651367));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        ///////

        // 114 (#4) fortbyte
        item = new Item();
        item.setId(114L);
        item.setLat(BigDecimal.valueOf(284.618774));
        item.setLng(BigDecimal.valueOf(-141.490141));
        item.setType(Type.FORTBYTE);
        item.setNumber(4);
        item.setAccepted(true);
        items.add(item);

        // 128 -> 114
        item = new Item();
        item.setId(128L);
        item.setLat(BigDecimal.valueOf(292.639160));
        item.setLng(BigDecimal.valueOf(-181.979980));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        // 129 -> 128
        item = new Item();
        item.setId(129L);
        item.setLat(BigDecimal.valueOf(285.283203));
        item.setLng(BigDecimal.valueOf(-112.897949));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        // 130 -> 129
        item = new Item();
        item.setId(130L);
        item.setLat(BigDecimal.valueOf(287.521973));
        item.setLng(BigDecimal.valueOf(-144.240723));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        ///////

        // 109 (#69) fortbyte
        item = new Item();
        item.setId(109L);
        item.setLat(BigDecimal.valueOf(-575.605037));
        item.setLng(BigDecimal.valueOf(88.165003));
        item.setType(Type.FORTBYTE);
        item.setNumber(67);
        item.setAccepted(true);
        items.add(item);

        // 131 -> 109
        item = new Item();
        item.setId(131L);
        item.setLat(BigDecimal.valueOf(-529.309082));
        item.setLng(BigDecimal.valueOf(110.019531));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        // 132 -> 131
        item = new Item();
        item.setId(132L);
        item.setLat(BigDecimal.valueOf(-498.605957));
        item.setLng(BigDecimal.valueOf(120.253906));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        // 133 -> 132
        item = new Item();
        item.setId(133L);
        item.setLat(BigDecimal.valueOf(-445.515137));
        item.setLng(BigDecimal.valueOf(121.213379));
        item.setType(Type.FORTBYTE);
        item.setAccepted(true);
        item.setLink(items.get(items.size() - 1));
        items.add(item);

        Mockito.when(itemRepository.findItemsByTypeAndAccepted(Type.FORTBYTE, true))
               .thenReturn(items);
    }

    @Test
    public void when3fortbytesWith3LinkedObjectsAreAdded_thenEachGeojsonMultilineShouldContain3PairsOfPoints() throws JsonParseException, IOException
    {
        // when
        ObjectNode geoJson = itemServ.getAcceptedItems(Type.FORTBYTE);

        // System.out.println((new ObjectMapper()).writerWithDefaultPrettyPrinter().writeValueAsString(geoJson));

        // then
        JsonNode features = geoJson.get("features");
        List<JsonNode> multiLines = StreamSupport.stream(features.spliterator(), false)
                                                 .filter(obj -> obj.get("geometry")
                                                                   .get("type")
                                                                   .textValue()
                                                                   .equals("MultiLineString"))
                                                 .collect(Collectors.toList());

        multiLines.forEach(obj ->
        {
            try
            {
                System.out.println((new ObjectMapper()).writerWithDefaultPrettyPrinter().writeValueAsString(obj));
            }
            catch (JsonProcessingException e)
            {
                e.printStackTrace();
            }
            assertThat(obj.get("geometry").get("coordinates").size()).isEqualTo(3);
        });
    }
}
