package pl.hordyjewiczmichal.fortnitebrmap.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;
import pl.hordyjewiczmichal.fortnitebrmap.model.Location;
import pl.hordyjewiczmichal.fortnitebrmap.repository.ItemRepository;
import pl.hordyjewiczmichal.fortnitebrmap.repository.LocationRepository;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

import java.util.List;

@Service
@Transactional
public class ItemService
{
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    LocationService locationService;

    public ObjectNode getItems(Type type)
    {
        List<Item> items = itemRepository.findItemsByType(type);
        return getGeoJSON(items);
    }

    public ObjectNode getItemsWithLine(Type type)
    {
        List<Item> items = itemRepository.findItemsByType(type);
        return getGeoJSONWithLines(items);
    }

    public ObjectNode getItemsInLocation(Type type, String location) throws NotFoundException
    {
        String parsedLocation = locationService.parseLocation(location);
        Location l = locationRepository.findByName(parsedLocation);

        if (l == null) throw new NotFoundException(location);

        List<Item> items = itemRepository.findByTypeAndLocation(type, l);
        return getGeoJSON(items);
    }

    public ObjectNode getRandomItem(Type type)
    {
        return getRandomItem(type, 1);
    }

    public ObjectNode getRandomItem(Type type, int limit)
    {
        List<Item> items = itemRepository.findRandom(type.toString(), limit);
        return getGeoJSON(items);
    }

//    public void save() //test
//    {
//        Item item = new Item();
//        item.setLat(new BigDecimal("123.123"));
//        item.setLng(new BigDecimal("456.456"));
//        item.setLocation(Location.TILTED_TOWERS);
//        item.setType(Type.AMMO_BOX);
//        itemRepository.save(item);
//    }

    private ObjectNode getGeoJSON(List<Item> items)
    {
        ObjectNode geoJSON = new ObjectMapper().createObjectNode();

        populateFeatures(items, geoJSON);

        return geoJSON;
    }

    private ObjectNode getGeoJSONWithLines(List<Item> items)
    {
        ObjectNode geoJSON = new ObjectMapper().createObjectNode();

        ArrayNode features = populateFeatures(items, geoJSON);

        items.forEach(item ->
        {
            if (item.getLink() != null)
            {
                ObjectNode f = features.addObject();
                f.put("type", "Feature")
                 .putObject("properties");

                ArrayNode coords = f.putObject("geometry")
                                    .put("type", "LineString")
                                    .putArray("coordinates");

                coords.addArray().add(item.getLng()).add(item.getLat());
                coords.addArray().add(item.getLink().getLng()).add(item.getLink().getLat());
            }
        });

        return geoJSON;
    }

    private ArrayNode populateFeatures(List<Item> items, ObjectNode geoJSON)
    {
        ArrayNode features = geoJSON.put("type", "FeatureCollection")
                                    .putArray("features");

        items.forEach(item ->
        {
            ObjectNode f = features.addObject();
            f.put("type", "Feature")
             .putObject("properties");

            ArrayNode coords = f.putObject("geometry")
                                .put("type", "Point")
                                .putArray("coordinates");

            coords.add(item.getLng())
                  .add(item.getLat());
        });
        return features;
    }
}
