"""
ref: 推薦システム実践入門
"""
from abc import ABC, abstractmethod
from util.dataset import Dataset
from util.recommend_result import RecommendResult


class BaseRecommender(ABC):
  """推薦システムの抽象規定クラス
  """

  @abstractmethod
  def recommend(self, dataset: Dataset, top_k: int, **kwargs) -> RecommendResult:
    """推薦システムによる推薦結果を返す。

    Parameters
    ----------
    dataset : Dataset
      データセット
    top_k : int
      上位top_k件

    Other Parameters
    ----------------
    推薦システム固有のパラメタ

    Returns
    -------
    RecommendResult
      推薦結果
    """
    pass