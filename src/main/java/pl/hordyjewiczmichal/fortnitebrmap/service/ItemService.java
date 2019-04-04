package pl.hordyjewiczmichal.fortnitebrmap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.hordyjewiczmichal.fortnitebrmap.dto.FeatureJSON;
import pl.hordyjewiczmichal.fortnitebrmap.dto.GeoJSON;
import pl.hordyjewiczmichal.fortnitebrmap.dto.GeometryJSON;
import pl.hordyjewiczmichal.fortnitebrmap.model.Item;
import pl.hordyjewiczmichal.fortnitebrmap.repository.ItemRepository;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Location;
import pl.hordyjewiczmichal.fortnitebrmap.statics.Type;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ItemService
{
    @Autowired
    ItemRepository itemRepository;

    public GeoJSON getItems(Type type)
    {
        List<Item> items = itemRepository.findItemsByType(type);
        return getGeoJSON(items);
    }


    public GeoJSON getItemsInLocation(Type type, String location) throws IllegalArgumentException
    {
        Location enumLocation;
        try
        {
            enumLocation = Location.valueOf(location.replaceAll("[- ]", "_").toUpperCase());
        }
        catch (IllegalArgumentException e)
        {
            throw new IllegalArgumentException("404 Location Not Found");
        }

        List<Item> items = itemRepository.findByTypeAndLocation(type, enumLocation);
        return getGeoJSON(items);
    }

    public GeoJSON getRandomItem(Type type)
    {
        return getRandomItem(type, 1);
    }

    public GeoJSON getRandomItem(Type type, int limit)
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

    private GeoJSON getGeoJSON(List<Item> items)
    {
        GeoJSON geoJSON = new GeoJSON();
        List<FeatureJSON> features = new ArrayList<>();

        items.forEach(item ->
        {
            String lat = item.getLat().toString();
            String lng = item.getLng().toString();

            FeatureJSON feature = new FeatureJSON();
            GeometryJSON geometry = new GeometryJSON(lat, lng);

            feature.setGeometry(geometry);
            features.add(feature);
        });

        geoJSON.setFeatures(features);

        return geoJSON;
    }


}
