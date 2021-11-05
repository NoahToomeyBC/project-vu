from app import db
from sqlalchemy.dialects.postgresql import JSON


class Result(db.Model):
    __tablename__ = 'results'

    State = db.Column(db.Text, primary_key=True)
    Rank_adult_access2019 = db.Column(db.String())
    result_all = db.Column(JSON)
    result_no_stop_words = db.Column(JSON)

    def __init__(State, Rank_adult_access2019, result_all, result_no_stop_words):
        State.url = Rank_adult_access2019
        State.result_all = result_all
        State.result_no_stop_words = result_no_stop_words

    def __repr__(self):
        return '<id {}>'.format(self.id)