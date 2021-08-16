from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import polyglotten.chat.routing

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            polyglotten.chat.routing.websocket_urlpatterns
        )
    ),
})
