Actual estructura de carpetas del frontend:
|--src/
|   ├───app/
|   │   ├───configuracion/
|   │   │   ├───contrato/
|   │   │   │   ├───components/
|   │   │   │   │    ├───ContractssTable.js
|   │   │   │   │    ├───FormCreateContract.js
|   │   │   │   │    └───FormEditContract.js
|   │   │   │   ├───hooks/
|   │   │   │   │    └───useContratos.js
|   │   │   │   └───page.js
|   │   │   ├───margen-comercial/
|   │   │   │   ├───components/
|   │   │   │   │    ├───ComercialMarginTable.js
|   │   │   │   │    ├───FormCreateComercialMargin.js
|   │   │   │   │    └───FormEditComercialMargin.js
|   │   │   │   |───hooks/
|   │   │   │   │    └───useMargenesComerciales.js
|   │   │   │   └───page.js
|   │   │   ├───polo/
|   │   │   │   ├───components/
|   │   │   │   │    ├───PoleTable.js
|   │   │   │   │    ├───FormCreatePole.js
|   │   │   │   │    └───FormEditPole.js
|   │   │   │   ├───hooks/
|   │   │   │   │    └───usePolos.js
|   │   │   │   └───page.js
|   │   │   └───representante/
|   │   │       ├───components/
|   │   │       │    ├───RepresentativeTable.js
|   │   │       │    ├───FormCreateRepresentative.js
|   │   │       │    └───FormEditRepresentative.js
|   │   │       |───hooks/
|   │   │       │    └───useRepresentantes.js
|   │   │       └───page.js
|   │   ├───economia/
|   │   │   ├───aprobacion/
|   │   │   ├───cliente/
|   │   │   │   |───components/
|   |   │   │   │    ├───ClientTable.js
|   |   │   │   │    ├───FormCreateClient.js
|   │   │   │   │    └───FormEditClient.js
|   │   │   │   |───hooks/
|   |   │   │   │    └───useClientes.js
|   │   │   │   └───page.js
|   │   │   ├───pedido/
|   │   │   ├───plan-importacion/
|   │   │   └───page.js
|   │   |───fonts/
|   |   |───desktop.ini
|   |   |───favicon.ico
|   |   |───global.css
|   |   |───layout.js
|   |   |───page.js
|   ├───components/
|   │   ├───form/
|   │   │   ├───FormButtons.jsx
|   |   │   ├───FormCancelButton.jsx
|   │   │   └───FormConfirmButton.jsx
|   │   ├───modal/
|   │   │   ├───ConfirmationModal.jsx
|   |   │   ├───ModalActionButton.jsx
|   |   │   ├───ModalButtons.jsx
|   │   │   └───ModalCancelButton.jsx
|   │   ├───ui/
|   │   │   ├───badge.jsx
|   |   │   ├───button.jsx
|   |   │   ├───card.jsx
|   |   │   ├───checkbox.jsx
|   |   │   ├───label.jsx
|   │   │   └───scroll-area.jsx
|   │   ├───ContractInfoItem.jsx
|   │   ├───CreateButton.jsx
|   │   ├───CustomCheckBox.jsx
|   │   ├───DeleteButton.jsx
|   │   ├───EditButton.jsx
|   │   ├───GenericTable.jsx
|   │   ├───InfoItem.jsx
|   │   ├───LoadingErrorWrapper.jsx
|   │   ├───Navbar.jsx
|   │   ├───Notification.jsx
|   │   ├───PageButtonsLayout.jsx
|   │   ├───PageComponentsLayout.jsx
|   │   ├───PageContent.jsx
|   │   ├───PageLayout.jsx
|   │   ├───PageTitle.jsx
|   │   ├───SearchField.jsx
|   │   ├───SectionTitle.jsx
|   │   └───Sidebar.jsx
|   ├───config/
|   │   └───navigation.js
|   ├───contexts/
|   │   └───NavigationContext.js
|   |───lib/
|   |   └───utils.js
|   |───services/
|   |	└───api.js
|   |───utils/
        ├───validations.js
        └───highlightMatch.js

Actual estructura de carpetas del backend:

|--backend/
|   ├───backend/
|   │   ├───env/
|   │   ├───gestion_aprobaciones/
|   │   ├───gestion_clientes/
|   │   │   ├───migrations/
|   │   │   ├───tests/
|   │   │   ├───utils/
|   │   │   ├───_init_.py
|   │   │   ├───admin.py
|   │   │   ├───apps.py
|   │   │   ├───filters.py
|   │   │   ├───models.py
|   │   │   ├───serializers.py
|   │   │   ├───urls.py
|   │   │   ├───validators.py
|   │   │   ├───views.py
|   │   ├───gestion_pedidos/
|   │   ├───gestion_plan_importacion/
|   │   ├───manage.py