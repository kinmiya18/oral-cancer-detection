from logging.config import fileConfig
import sys
import os
from dotenv import load_dotenv
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

# Load file .env
load_dotenv()
print("DB_URL from env:", os.getenv("DB_URL"))  # Debug

# Thêm đường dẫn để import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))  
from app.db.database import Base
from app.models.user import User
from app.models.prediction import Prediction

# This is the Alembic Config object
config = context.config

# Thiết lập sqlalchemy.url từ biến môi trường
db_url = os.getenv("DB_URL")
if db_url:
    config.set_main_option("sqlalchemy.url", db_url)
else:
    raise ValueError("DB_URL not found in environment variables")

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Add your model's MetaData object here
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()