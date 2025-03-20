import { render, screen } from '@testing-library/react';
import PokemonItem from './PokemonItem';
import { getIdFromUrl } from '../utils';

jest.mock('../utils', () => ({
  getIdFromUrl: jest.fn(),
}));

describe('PokemonItem 컴포넌트', () => {
  const mockGetIdFromUrl = getIdFromUrl as jest.Mock;

  test('id prop이 제공된 경우, 해당 id를 사용하여 렌더링한다', () => {
    const props = {
      id: 25,
      name: 'Pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    };

    render(<PokemonItem {...props} />);

    // 이미지의 alt 텍스트와 src 검증
    const image = screen.getByAltText('Pikachu');
    expect(image).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );

    // 이름과 id 텍스트 검증
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('#25')).toBeInTheDocument();
  });

  test('id prop이 없는 경우, getIdFromUrl로부터 반환된 id를 사용한다', () => {
    // getIdFromUrl 모킹하여 특정 id 반환
    mockGetIdFromUrl.mockReturnValue(150);

    const props = {
      name: 'Mewtwo',
      url: 'https://pokeapi.co/api/v2/pokemon/150/',
    };

    render(<PokemonItem {...props} />);

    const image = screen.getByAltText('Mewtwo');
    expect(image).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    );

    expect(screen.getByText('Mewtwo')).toBeInTheDocument();
    expect(screen.getByText('#150')).toBeInTheDocument();

    // getIdFromUrl가 url을 인자로 호출되었는지 확인
    expect(mockGetIdFromUrl).toHaveBeenCalledWith(props.url);
  });
});
