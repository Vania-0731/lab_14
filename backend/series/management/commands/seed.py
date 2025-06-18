from django.core.management.base import BaseCommand
from series.models import Category, Serie
from datetime import date


class Command(BaseCommand):
    help = "Carga categorías y series iniciales"

    def handle(self, *args, **options):
        Serie.objects.all().delete()
        Category.objects.all().delete()

        categories_data = [
            {"description": "Horror"},
            {"description": "Comedy"},
            {"description": "Action"},
            {"description": "Drama"},
        ]

        categories = {}
        for cat_data in categories_data:
            category = Category.objects.create(**cat_data)
            categories[category.description] = category

        series_data = [
            {"name": "Friends", "cat": "Comedy", "img": "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/52dae4c7-2ab1-4bb9-ab1c-8100fd54e2f9/b29b3d80-ab56-11ef-9fed-0affd17b6387?host=wbd-images.prod-vod.h264.io&partner=beamcom"},
            {"name": "Law & Order", "cat": "Drama", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Law_%26_Order.png/1200px-Law_%26_Order.png"},
            {"name": "The Big Bang Theory", "cat": "Comedy", "img": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/07/personajes-big-bang-theory-2003689.jpg?tf=3840x"},
            {"name": "Stranger Things", "cat": "Horror", "img": "https://static.digit.in/Stranger-Things-1.png"},
            {"name": "Dr. House", "cat": "Drama", "img": "https://editorialtelevisa.brightspotcdn.com/dims4/default/a505050/2147483647/strip/true/crop/1308x736+0+116/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2F1a%2F2a%2Fd1b0dbdd4caba148ce7f5a220e9d%2Fdr-house.jpg"},
            {"name": "The X-Files", "cat": "Drama", "img": "https://m.media-amazon.com/images/S/pv-target-images/ed07e0438d55df031b039493d752a04fe69b74ccaee93fa7dbb62c33f387fe12.jpg"},
            {"name": "Breaking Bad", "cat": "Drama", "img": "https://illuminatilab.com/blog/wp-content/uploads/2013/10/Breaking-Bad.jpg"},
            {"name": "Brooklyn Nine-Nine", "cat": "Comedy", "img": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUjszGh751A2Qv0FAIdj7Ew4HW4AR50ktpTLbOeSnZT4ozEMw6ChEgySTFKKOLIzjT35Zj8aSnNLD31CzX21uP9B-E95gqD9-avzZksoK3T4UVafrjXSFnScwWydEvAQydqAwbjAXlMdHN/s1600/brooklyn-nine-nine-poster.jpg"},
            {"name": "The Walking Dead", "cat": "Horror", "img": "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/e29ec367-0fc5-44f6-b4a5-4172f55632fb/compose?aspectRatio=1.78&format=webp&width=1200"},
            {"name": "The Boys", "cat": "Action", "img": "https://4kwallpapers.com/images/wallpapers/the-boys-season-4-2560x1440-17287.jpg"},
            {"name": "Lucifer", "cat": "Drama", "img": "https://images2.alphacoders.com/109/thumb-1920-1091219.jpg"},
            {"name": "Supernatural", "cat": "Horror", "img": "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/759711ff-f46f-4c29-9134-84e247e0e7da/2f27a560913e812f47810275ca2f3da020ed847b.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom"},
        ]

        for s in series_data:
            Serie.objects.create(
                name=s["name"],
                release_date=date(2020, 1, 1),
                rating=0,
                category=categories[s["cat"]],
                image=s["img"]
            )

        self.stdout.write(self.style.SUCCESS("Datos cargados correctamente."))
