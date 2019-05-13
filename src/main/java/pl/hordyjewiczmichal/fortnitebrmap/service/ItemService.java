package pl.hordyjewiczmichal.fortnitebrmap.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.hordyjewiczmichal.fortnitebrmap.dto.NewItemDTO;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;
import pl.hordyjewiczmichal.fortnitebrmap.model.Location;
import pl.hordyjewiczmichal.fortnitebrmap.repository.ItemRepository;
import pl.hordyjewiczmichal.fortnitebrmap.repository.LocationRepository;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
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

    public ObjectNode getAcceptedItems(Type type)
    {
        List<Item> items = itemRepository.findItemsByTypeAndAccepted(type, true);
        return getGeoJSON(items);
    }

    public ObjectNode getAllItems() // all in one, for admin
    {
        List<Item> items = itemRepository.findAll();
        return getGeoJSON(items);
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

    private ObjectNode getGeoJSON(List<Item> items, boolean includeProperties)
    {
        ObjectNode geoJSON = new ObjectMapper().createObjectNode();
        ArrayNode features = geoJSON.put("type", "FeatureCollection")
                                    .putArray("features");

        items.forEach(item ->
        {
            ObjectNode f = features.addObject();
            f.put("type", "Feature")
             .putObject("properties"); // TODO: put properties if flag is true

            ArrayNode coords = f.putObject("geometry")
                                .put("type", "Point")
                                .putArray("coordinates");

            coords.add(item.getLng())
                  .add(item.getLat());
        });

        // check if item is linked
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

    private ObjectNode getGeoJSON(Item item)
    {
        List<Item> i = new ArrayList<>();
        i.add(item);
        return getGeoJSON(i);
    }

    private ObjectNode getGeoJSON(List<Item> items)
    {
        return getGeoJSON(items, false);
    }

    public ObjectNode savePoint(NewItemDTO newItemDTO, Type type)
    {
        Item newItem = new Item();

        newItem.setAccepted(false);

        BigDecimal lat = new BigDecimal(newItemDTO.getLat());
        BigDecimal lng = new BigDecimal(newItemDTO.getLng());
        newItem.setLat(lat.setScale(6, RoundingMode.HALF_UP));
        newItem.setLng(lng.setScale(6, RoundingMode.HALF_UP));

        newItem.setType(type);

        String parsedLocation = locationService.parseLocation(newItemDTO.getLocation());
        Location l = locationRepository.findByName(parsedLocation);
        newItem.setLocation(l); // l can be null

        // newItem.setLink(itemRepository.getOne(999999L));
        newItem.setLink(null); // id of existing Item or null

        Item createdItem = itemRepository.save(newItem);
        return getGeoJSON(createdItem);
    }
}
