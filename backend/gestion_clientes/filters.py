import django_filters
from .models import Pole, Representative, ComercialMargin, Contract, Client


class PoleFilter(django_filters.FilterSet):
    denomination = django_filters.CharFilter(
        lookup_expr="icontains"
    )  # Búsqueda insensible a mayúsculas/minúsculas

    class Meta:
        model = Pole
        fields = ["denomination"]


class RepresentativeFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr="icontains")
    last_name = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Representative
        fields = ["name", "last_name"]


class ComercialMarginFilter(django_filters.FilterSet):
    comercial_margin = django_filters.NumberFilter()

    class Meta:
        model = ComercialMargin
        fields = ["comercial_margin"]


class ContractFilter(django_filters.FilterSet):
    contract_number = django_filters.CharFilter(lookup_expr="icontains")
    signature_date = django_filters.DateFromToRangeFilter()
    expiration_date = django_filters.DateFromToRangeFilter()
    client = django_filters.ModelChoiceFilter(queryset=Client.objects.all())
    client_name = django_filters.CharFilter(
        field_name="client__name", lookup_expr="icontains"
    )

    class Meta:
        model = Contract
        fields = [
            "contract_number",
            "signature_date",
            "expiration_date",
            "client",
            "client_name",
        ]


class ClientFilter(django_filters.FilterSet):
    code = django_filters.CharFilter(lookup_expr="icontains")
    name = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Client
        fields = ["code", "name"]
