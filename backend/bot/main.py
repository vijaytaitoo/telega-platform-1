from aiogram import Bot, Dispatcher, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.utils import executor
import os
from dotenv import load_dotenv

# Загрузка переменных окружения
load_dotenv()

# Инициализация бота и диспетчера
bot = Bot(token=os.getenv('BOT_TOKEN'))
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)

# Состояния для FSM (Finite State Machine)
class UserStates(StatesGroup):
    waiting_for_input = State()

# Обработчик команды /start
@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.reply(
        "Привет! Я бот TeleGa Studio. "
        "Я помогу вам создать и настроить ваш магазин в Telegram."
    )

# Обработчик текстовых сообщений
@dp.message_handler(content_types=types.ContentTypes.TEXT)
async def handle_text(message: types.Message):
    await message.reply(
        "Я получил ваше сообщение. "
        "Скоро здесь появится функционал для управления магазином!"
    )

# Обработчик ошибок
@dp.errors_handler()
async def errors_handler(update, exception):
    print(f'Произошла ошибка: {exception}')
    return True

if __name__ == '__main__':
    # Запуск бота
    executor.start_polling(dp, skip_updates=True)