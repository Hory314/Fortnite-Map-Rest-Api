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

import javax.servlet.http.HttpServletRequest;
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
    @Autowired
    HttpServletRequest request;

    public ObjectNode getAcceptedItems(Type type)
    {
        List<Item> items = itemRepository.findItemsByTypeAndAccepted(type, true);
        return getGeoJSON(items);
    }

    public ObjectNode getAllItems() // all in one, for admin
    {
        List<Item> items = itemRepository.findAll();
        return getGeoJSON(items, true);
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

        items.stream()
             .filter(item -> !(item.getType() == Type.FORTBYTE && item.getLink() != null)) // filter fortbytes lines
             .forEach(item ->
             {
                 ObjectNode f = features.addObject();
                 f.put("type", "Feature");

                 ObjectNode propObj = f.putObject("properties");

                 if (includeProperties) // put extra properties for admin
                 {
                     propObj.put("id", item.getId());
                     propObj.put("type,", item.getType().toString());
                     propObj.put("accepted", item.getAccepted());
                     propObj.put("radius", item.getCircleRadius());
                     propObj.put("number", item.getNumber());
                     propObj.put("image_url", item.getImageUrl());
                     propObj.put("link_id", item.getLink() == null ? null : item.getLink().getId());
                     propObj.put("location_id", item.getLocation() == null ? null : item.getLocation().getId());
                     propObj.put("description_id", item.getDescription() == null ? null : item.getDescription()
                                                                                              .getId());
                 }
                 else // put public api properties
                 {
                     propObj.put("id", item.getId()); // include id

                     if (item.getCircleRadius() != null) // include radius if exists
                     {
                         propObj.put("radius", item.getCircleRadius());
                     }

                     if (item.getNumber() != null) // include number if exists
                     {
                         propObj.put("number", item.getNumber());
                     }

                     if (item.getDescription() != null) // include descriptions if exists
                     {
                         ObjectNode descObj = propObj.putObject("descriptions");
                         descObj.put("en", item.getDescription().getEn());
                         descObj.put("pl", item.getDescription().getPl());
                     }

                     if (item.getImageUrl() != null) // include image url
                     {
                         propObj.put("image_url", "http://" + request.getHeader("host") + "/" + item.getImageUrl());
                     }
                 }

                 ArrayNode coords = f.putObject("geometry")
                                     .put("type", "Point")
                                     .putArray("coordinates");

                 coords.add(item.getLng())
                       .add(item.getLat());
             });

        // check if item is linked
        // start and target ids properties only needed
        List<Item> multiLine = new ArrayList<>();
        items.stream()
             .filter(item -> item.getLink() != null)
             .sorted((item1, item2) -> (int) (item2.getLink().getId() - item1.getLink().getId()))
             .forEach(item ->
             {
                 if (item.getLink().getLink() != null) // link
                 {
                     multiLine.add(item);
                 }
                 else // no more links = fortbyte
                 {
                     multiLine.add(item);

                     ObjectNode f = features.addObject();
                     f.put("type", "Feature");

                     ObjectNode propObj = f.putObject("properties");
                     propObj.put("start_id", multiLine.get(0).getId()); // put start id in properties
                     propObj.put("target_id", item.getLink().getId()); // put target id in properties

                     ArrayNode coords = f.putObject("geometry")
                                         .put("type", "MultiLineString")
                                         .putArray("coordinates");

                     multiLine.forEach(i -> // add next line to array
                     {
                         ArrayNode MLine = coords.addArray();
                         MLine.addArray().add(i.getLng()).add(i.getLat());
                         MLine.addArray().add(i.getLink().getLng()).add(i.getLink().getLat());
                     });

                     multiLine.clear();
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

        newItem.setNumber(newItemDTO.getNumber());

        Item createdItem = itemRepository.save(newItem);
        return getGeoJSON(createdItem);
    }
}
