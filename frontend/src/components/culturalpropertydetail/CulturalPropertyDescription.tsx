import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { CulturalPropertyData } from '../../types/culturalpropertytype';

export default function CulturalPropertyDescription() {
  const culturalPropertydata = useSelector<
    AppState,
    CulturalPropertyData | null
  >(({ culturalProperty }) => culturalProperty.value);
  const starAr = culturalPropertydata?.result.starCountRes.starAr
    ? culturalPropertydata?.result.starCountRes.starAr
    : 0;

  const starPose = culturalPropertydata?.result.starCountRes.starAr
    ? culturalPropertydata?.result.starCountRes.starPose
    : 0;

  const starQuiz = culturalPropertydata?.result.starCountRes.starQuiz
    ? culturalPropertydata?.result.starCountRes.starQuiz
    : 0;

  const starCnt = starAr + starPose + starQuiz;

  return (
    <div>
      <div>{culturalPropertydata?.result.culturalProperty.description}</div>

      {starCnt > 0 ? (
        <div>
          {culturalPropertydata?.result.culturalProperty.hiddenDescription}
        </div>
      ) : (
        <div>111</div>
      )}
    </div>
  );
}
