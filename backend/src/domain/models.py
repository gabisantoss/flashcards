from enum import Enum


class FlashcardStatus(str, Enum):
    TO_STUDY = "to-study"
    STUDIED = "studied"
